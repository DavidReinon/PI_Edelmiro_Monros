<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Noticias;
use Symfony\Component\HttpFoundation\JsonResponse;

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
        $data = json_decode($request->getContent(), associative: true);

        $noticia = new Noticias();
        $noticia->setTitulo($data['titulo']);
        $noticia->setDescripcion($data['descripcion']);
        $noticia->setFecha(\DateTime::createFromFormat('Y-m-d', $data['fecha']));
        $noticia->setFoto(file_get_contents($request->files->get('foto')->getRealPath()));
        $noticia->setUsuario($data['usuario']);

        $em->persist($noticia);
        $em->flush();

        return new JsonResponse(['status' => 'Noticia creada'], status: 201);
    }
}
