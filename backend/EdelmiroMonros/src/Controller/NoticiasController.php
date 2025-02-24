<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Noticias;
use App\Entity\Usuarios;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

#[Route('/api/noticias', name: 'app_noticias')]
final class NoticiasController extends AbstractController
{

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $titulo = $data['titulo'] ?? null;
        $descripcion = $data['descripcion'] ?? null;
        $fecha = $data['fecha'] ?? null;
        $usuarioId = $data['usuario'] ?? null;
        $imagenBase64 = $data['foto'] ?? null;

        if (!$titulo) {
            return new JsonResponse(['error' => 'El título es obligatorio'], JsonResponse::HTTP_BAD_REQUEST);
        }
        if (!$descripcion) {
            return new JsonResponse(['error' => 'La descripción es obligatoria'], JsonResponse::HTTP_BAD_REQUEST);
        }
        if (!$fecha) {
            return new JsonResponse(['error' => 'La fecha es obligatoria'], JsonResponse::HTTP_BAD_REQUEST);
        }
        if (!$usuarioId) {
            return new JsonResponse(['error' => 'El ID del usuario es obligatorio'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $usuario = $em->getRepository(Usuarios::class)->find($usuarioId);
        if (!$usuario) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $noticia = new Noticias();
        $noticia->setTitulo($titulo);
        $noticia->setDescripcion($descripcion);
        $fechaObject = new \DateTime($fecha);
        if ($fechaObject === false) {
            return new JsonResponse(['error' => 'Formato de fecha inválido'], JsonResponse::HTTP_BAD_REQUEST);
        }
        $noticia->setFecha($fechaObject);
        $noticia->setUsuario($usuario);

        if ($imagenBase64) {
            try {
                $imageData = base64_decode($imagenBase64);

                if ($imageData === false) {
                    return new JsonResponse(['error' => 'Error al decodificar la imagen'], JsonResponse::HTTP_BAD_REQUEST);
                }

                $fileName = uniqid('noticia_') . '.jpg';

                $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/noticias/';
                if (!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                file_put_contents($uploadDir . $fileName, $imageData);

                $noticia->setFoto('/uploads/noticias/' . $fileName);
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Error al guardar la imagen'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        $em->persist($noticia);
        $em->flush();

        $response = new JsonResponse(['status' => 'Noticia creada'], JsonResponse::HTTP_CREATED);

        return $response;
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $noticias = $em->getRepository(Noticias::class)->findAll();
        $data = [];
        foreach ($noticias as $noticia) {
            $fecha = $noticia->getFecha();
            $fechaFormateada = $fecha ? $fecha->format('Y-m-d') : null;
            $data[] = [
                'id' => $noticia->getId(),
                'titulo' => $noticia->getTitulo(),
                'descripcion' => $noticia->getDescripcion(),
                'fecha' => $fechaFormateada,
                'usuario' => $noticia->getUsuario()->getId(),
                'foto' => $noticia->getFoto()
            ];
        }
        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Noticias $noticia): JsonResponse
    {
        $data = [
            'id' => $noticia->getId(),
            'titulo' => $noticia->getTitulo(),
            'descripcion' => $noticia->getDescripcion(),
            'fecha' => $noticia->getFecha(),
            'usuario' => $noticia->getUsuario()->getId(),
            'foto' => $noticia->getFoto()
        ];

        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, Noticias $noticia, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), associative: true);
        $titulo = $data['titulo'] ?? null;
        $descripcion = $data['descripcion'] ?? null;
        $fecha = $data['fecha'] ?? null;
        $usuarioId = $data['usuario'] ?? null;
        $imagenBase64 = $data['foto'] ?? null;

        if ($imagenBase64) {
            try {
                if ($noticia->getFoto()) {
                    $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/noticias/';
                    $filePath = $uploadDir . basename($noticia->getFoto());

                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                }
                $imageData = base64_decode($imagenBase64);

                if ($imageData === false) {
                    return new JsonResponse(['error' => 'Error al decodificar la imagen'], JsonResponse::HTTP_BAD_REQUEST);
                }

                $fileName = uniqid('noticia_') . '.jpg';

                $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/noticias/';
                if (!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                file_put_contents($uploadDir . $fileName, $imageData);

                $noticia->setFoto('/uploads/noticias/' . $fileName);
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Error al guardar la imagen'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        $usuario = $em->getRepository(Usuarios::class)->find($usuarioId);
        if (!$usuario) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], JsonResponse::HTTP_BAD_REQUEST);
        }


        $noticia->setTitulo($titulo);
        $noticia->setDescripcion($descripcion);
        $noticia->setFecha(new \DateTime($fecha));
        $noticia->setUsuario($usuario);


        $em->flush();
        return new JsonResponse(['status' => 'Noticia actualizada']);
    }

    #[Route('/{id}', name: 'partial_update', methods: ['PATCH'])]
    public function partialUpdate(Request $request, Noticias $noticia, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), associative: true);

        if (isset($data['titulo'])) {
            $noticia->setTitulo($data['titulo']);
        }
        if (isset($data['descripcion'])) {
            $noticia->setDescripcion($data['descripcion']);
        }
        if (isset($data['fecha'])) {
            $noticia->setFecha(new \DateTime($data['fecha']));
        }
        if (isset($data['usuario'])) {
            $usuario = $em->getRepository(Usuarios::class)->find($data['usuario']);
            if (!$usuario) {
                return new JsonResponse(['error' => 'Usuario no encontrado'], JsonResponse::HTTP_BAD_REQUEST);
            }
            $noticia->setUsuario($usuario);
        }
        if (isset($data['foto'])) {
            if ($noticia->getFoto()) {
                $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/noticias/';
                $filePath = $uploadDir . basename($noticia->getFoto());

                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }
            if ($data['foto']) {
                try {
                    $imageData = base64_decode($data['foto']);

                    if ($imageData === false) {
                        return new JsonResponse(['error' => 'Error al decodificar la imagen'], JsonResponse::HTTP_BAD_REQUEST);
                    }

                    $fileName = uniqid('noticia_') . '.jpg';

                    $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/noticias/';
                    if (!file_exists($uploadDir)) {
                        mkdir($uploadDir, 0777, true);
                    }

                    file_put_contents($uploadDir . $fileName, $imageData);

                    $noticia->setFoto('/uploads/noticias/' . $fileName);
                } catch (\Exception $e) {
                    return new JsonResponse(['error' => 'Error al guardar la imagen'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
                }
            }
            $noticia->setFoto('/uploads/noticias/' . $fileName);
        }

        $em->flush();
        return new JsonResponse(['status' => 'Noticia actualizada']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Noticias $noticia, EntityManagerInterface $em): JsonResponse
    {
        if ($noticia->getFoto()) {
            $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/noticias/';
            $filePath = $uploadDir . basename($noticia->getFoto());

            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }

        $em->remove($noticia);
        $em->flush();
        return new JsonResponse(['status' => 'Noticia eliminada']);
    }
}