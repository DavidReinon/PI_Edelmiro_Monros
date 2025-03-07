<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Productos;
use App\Entity\Usuarios;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

#[Route('/api/productos', name: 'app_productos')]
final class ProductosController extends AbstractController
{
    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $nombre = $data['nombre'];
        $descripcion = $data['descripcion'];
        $precio = $data['precio'] ?? null;
        $stock = $data['stock'] ?? null;
        $usuarioId = $data['usuario'];
        $imagenBase64 = $data['foto'] ?? null;

        if (!$nombre) {
            return new JsonResponse(['error' => 'Nombre es requerido'], JsonResponse::HTTP_BAD_REQUEST);
        }
        if (!$descripcion) {
            return new JsonResponse(['error' => 'Descripción es requerida'], JsonResponse::HTTP_BAD_REQUEST);
        }
        if (!$usuarioId) {
            return new JsonResponse(['error' => 'El ID del Usuario es requerido'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $usuario = $em->getRepository(Usuarios::class)->find($usuarioId);
        if (!$usuario) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $producto = new Productos();
        $producto->setNombre($nombre);
        $producto->setDescripcion($descripcion);
        $producto->setPrecio($precio);
        $producto->setStock($stock);
        $producto->setUsuarioProducto($usuario);

        if ($imagenBase64) {
            $result = $this->handleImageUpload($imagenBase64);
            if ($result['error']) {
                return new JsonResponse(['error' => $result['message']], $result['status']);
            }
            $producto->setFoto($result['path']);
        }

        $em->persist($producto);
        $em->flush();

        return new JsonResponse(['status' => 'Producto creado'], JsonResponse::HTTP_CREATED);
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $productos = $em->getRepository(Productos::class)->findAll();
        $data = [];
        foreach ($productos as $producto) {
            $data[] = [
                'id' => $producto->getId(),
                'nombre' => $producto->getNombre(),
                'descripcion' => $producto->getDescripcion(),
                'precio' => $producto->getPrecio(),
                'stock' => $producto->getStock(),
                'usuario' => $producto->getUsuarioProducto()->getId(),
                'foto' => $producto->getFoto()
            ];
        }
        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Productos $producto): JsonResponse
    {
        $data = [
            'id' => $producto->getId(),
            'nombre' => $producto->getNombre(),
            'descripcion' => $producto->getDescripcion(),
            'precio' => $producto->getPrecio(),
            'stock' => $producto->getStock(),
            'usuario' => $producto->getUsuarioProducto()->getId(),
            'foto' => $producto->getFoto()
        ];
        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, Productos $producto, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);


        $imagenBase64 = $data['foto'] ?? null;

        $usuario = $em->getRepository(Usuarios::class)->find($data['usuario']);
        if (!$usuario) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $producto->setNombre($data['nombre']);
        $producto->setDescripcion($data['descripcion']);
        $producto->setPrecio($data['precio']);
        $producto->setStock($data['stock']);
        $producto->setUsuarioProducto($usuario);

        if ($imagenBase64) {
            try {
                if ($producto->getFoto()) {
                    $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/productos/';
                    $filePath = $uploadDir . basename($producto->getFoto());

                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                }
                $imageData = base64_decode($imagenBase64);

                if ($imageData === false) {
                    return new JsonResponse(['error' => 'Error al decodificar la imagen'], JsonResponse::HTTP_BAD_REQUEST);
                }

                $fileName = uniqid('noticia_') . '.jpg';

                $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/productos/';
                if (!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                file_put_contents($uploadDir . $fileName, $imageData);

                $producto->setFoto('/uploads/productos/' . $fileName);
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Error al guardar la imagen'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        $em->flush();
        return new JsonResponse(['status' => 'Producto actualizado']);
    }

    #[Route('/{id}', name: 'partial_update', methods: ['PATCH'])]
    public function partialUpdate(Request $request, Productos $producto, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['nombre'])) {
            $producto->setNombre($data['nombre']);
        }
        if (isset($data['descripcion'])) {
            $producto->setDescripcion($data['descripcion']);
        }
        if (isset($data['precio'])) {
            $producto->setPrecio($data['precio']);
        }
        if (isset($data['stock'])) {
            $producto->setStock($data['stock']);
        }
        if (isset($data['usuario'])) {
            $usuario = $em->getRepository(Usuarios::class)->find($data['usuario']);
            if (!$usuario) {
                return new JsonResponse(['error' => 'Usuario no encontrado'], JsonResponse::HTTP_BAD_REQUEST);
            }
            $producto->setUsuarioProducto($usuario);
        }
        if (isset($data['foto'])) {
            if ($producto->getFoto()) {
                $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/productos/';
                $filePath = $uploadDir . basename($producto->getFoto());

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

                    $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/productos/';
                    if (!file_exists($uploadDir)) {
                        mkdir($uploadDir, 0777, true);
                    }

                    file_put_contents($uploadDir . $fileName, $imageData);

                    $producto->setFoto('/uploads/productos/' . $fileName);
                } catch (\Exception $e) {
                    return new JsonResponse(['error' => 'Error al guardar la imagen'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
                }
            }
        }

        $em->flush();
        return new JsonResponse(['status' => 'Producto actualizado']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Productos $producto, EntityManagerInterface $em): JsonResponse
    {
        if ($producto->getFoto()) {
            $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/noticias/';
            $filePath = $uploadDir . basename($producto->getFoto());

            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }
        $em->remove($producto);
        $em->flush();
        return new JsonResponse(['status' => 'Producto eliminado']);
    }

    private function handleImageUpload(string $imagenBase64): array
    {
        try {
            $imageData = base64_decode($imagenBase64);

            if ($imageData === false) {
                return ['error' => true, 'message' => 'Error al decodificar la imagen', 'status' => JsonResponse::HTTP_BAD_REQUEST];
            }

            $fileName = uniqid('producto_') . '.jpg';

            $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/productos/';
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            file_put_contents($uploadDir . $fileName, $imageData);

            return ['error' => false, 'path' => '/uploads/productos/' . $fileName];
        } catch (\Exception $e) {
            return ['error' => true, 'message' => 'Error al guardar la imagen', 'status' => JsonResponse::HTTP_INTERNAL_SERVER_ERROR];
        }
    }
}
