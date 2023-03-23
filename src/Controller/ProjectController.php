<?php

namespace App\Controller;

use App\Entity\Project;
use App\Repository\ProjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ProjectController extends AbstractController
{

    public function __construct(private readonly ProjectRepository $repository)
    {
    }

    #[Route('/project', name: 'project_index', methods: ["GET"])]
    public function index(): Response
    {
        $products = $this->repository->findAll();

        $data = [];

        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
            ];
        }


        return $this->json($data);
    }


    #[Route('/project', name: 'project_new', methods: ["POST"])]
    public function new(Request $request): Response
    {

        $project = new Project();
        $project->setName($request->request->get('name'));
        $project->setDescription($request->request->get('description'));

        $this->repository->save($project, true);

        return $this->json('Created new project successfully with id ' . $project->getId());
    }

    #[Route('/project/{id}', name: 'project_show', methods: ["GET"])]
    public function show(int $id): Response
    {
        $project = $this->repository->find($id);

        if (!$project) {

            return $this->json('No project found for id' . $id, 404);
        }

        $data = [
            'id' => $project->getId(),
            'name' => $project->getName(),
            'description' => $project->getDescription(),
        ];

        return $this->json($data);
    }

    #[Route('/project/{id}', name: 'project_edit', methods: ["PUT", "PATCH"])]
    public function edit(Request $request, int $id): Response
    {
        $project = $this->repository->find($id);

        if (!$project) {
            return $this->json('No project found for id' . $id, 404);
        }

        $content = json_decode($request->getContent());
        $project->setName($content->name);
        $project->setDescription($content->description);

        $this->repository->save($project,true);

        $data = [
            'id' => $project->getId(),
            'name' => $project->getName(),
            'description' => $project->getDescription(),
        ];

        return $this->json($data);
    }

    #[Route('/project/{id}', name: 'project_delete', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        $project = $this->repository->find($id);

        if (!$project) {
            return $this->json('No project found for id' . $id, 404);
        }

        $this->repository->remove($project,true);

        return $this->json('Deleted a project successfully with id ' . $id);
    }
}
