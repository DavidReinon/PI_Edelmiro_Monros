<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
#[Route('/clientes', name: 'app_clientes')]
final class ClientesController extends AbstractController
{
    
    public function index(): Response
    {
        return $this->render('clientes/index.html.twig', [
            'controller_name' => 'ClientesController',
        ]);
    }
}
