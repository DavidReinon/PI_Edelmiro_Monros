<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ResenasController extends AbstractController
{
    #[Route('/resenas', name: 'app_resenas')]
    public function index(): Response
    {
        return $this->render('resenas/index.html.twig', [
            'controller_name' => 'ResenasController',
        ]);
    }
}
