<?php

// NoticiasController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Noticias;
use App\Entity\Usuarios;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

final class NoticiasController extends AbstractController
{
    #[Route('/noticias', name: 'app_noticias')]
    public function index(): Response
    {
        return $this->render('noticias/index.html.twig', [
            'controller_name' => 'NoticiasController',
        ]);
    }

    #[Route('/api/noticias', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        var_dump($data);

        $titulo = $data['titulo'] ?? null;
        $descripcion = $data['descripcion'] ?? null;
        $fecha = $data['fecha'] ?? null;
        $usuarioId = $data['usuario'] ?? null;
        $imagenBase64 = $data['foto'] ?? null; 

        if (!$titulo || !$descripcion || !$fecha || !$usuarioId) {
            return new JsonResponse(['error' => 'Datos inválidos'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $usuario = $em->getRepository(Usuarios::class)->find($usuarioId);
        if (!$usuario) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $noticia = new Noticias();
        $noticia->setTitulo($titulo);
        $noticia->setDescripcion($descripcion);
        $noticia->setFecha(\DateTime::createFromFormat('Y-m-d', $fecha));
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

                $noticia->setFoto('/public/uploads/noticias/fallas.jpg');
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Error al guardar la imagen'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        $em->persist($noticia);
        $em->flush();

        return new JsonResponse(['status' => 'Noticia creada'], JsonResponse::HTTP_CREATED);
    }
}
