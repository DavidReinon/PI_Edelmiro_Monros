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

    #[Route('/noticias', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        if (!$request->isMethod('POST')) {
            return new JsonResponse(['error' => 'Método no permitido'], JsonResponse::HTTP_METHOD_NOT_ALLOWED);
        }

        // Asegurar que es multipart/form-data
        if (!str_contains($request->headers->get('Content-Type') ?? '', 'multipart/form-data')) {
            return new JsonResponse(['error' => 'Tipo de contenido no soportado'], JsonResponse::HTTP_UNSUPPORTED_MEDIA_TYPE);
        }

        $titulo = $request->request->get('titulo');
        $descripcion = $request->request->get('descripcion');
        $fecha = $request->request->get('fecha');
        $usuarioId = $request->request->get('usuario');

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

        // Procesar la foto
        $fotoFile = $request->files->get('foto');
        if ($fotoFile) {
            $fileName = uniqid('noticia_') . '.' . $fotoFile->guessExtension();
            $fotoFile->move($this->getParameter('kernel.project_dir') . '/public/uploads/noticias', $fileName);
            $noticia->setFoto($fileName);
        }

        $em->persist($noticia);
        $em->flush();

        return new JsonResponse(['status' => 'Noticia creada'], JsonResponse::HTTP_CREATED);
    }
}
