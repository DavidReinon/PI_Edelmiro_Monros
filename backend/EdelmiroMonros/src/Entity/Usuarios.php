<?php
//hola
namespace App\Entity;

use App\Repository\UsuariosRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: UsuariosRepository::class)]
#[UniqueEntity(fields: ['gmail'], message: 'Este gmail ya está registrado.')]
#[UniqueEntity(fields: ['nombre'], message: 'Este nombre de usuario ya está en uso.')]
#[ApiResource]
class Usuarios
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    private ?string $contraseña = null;

    #[ORM\Column(length: 255)]
    private ?string $gmail = null;

    #[ORM\Column]
    private ?bool $admin = null;


    /**
     * @var Collection<int, Noticias>
     */
    #[ORM\OneToMany(targetEntity: Noticias::class, mappedBy: 'usuario')]
    private Collection $noticias;

    /**
     * @var Collection<int, Productos>
     */
    #[ORM\OneToMany(targetEntity: Productos::class, mappedBy: 'usuarioProducto')]
    private Collection $productos;

    public function __construct()
    {
        $this->noticias = new ArrayCollection();
        $this->productos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getContraseña(): ?string
    {
        return $this->contraseña;
    }

    public function setContraseña(string $contraseña): static
    {
        $this->contraseña = $contraseña;

        return $this;
    }

    public function isAdmin(): ?bool
    {
        return $this->admin;
    }

    public function setAdmin(bool $admin): static
    {
        $this->admin = $admin;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->gmail;
    }

    public function setEmail(string $gmail): static
    {
        $this->gmail = $gmail;

        return $this;
    }

    /**
     * @return Collection<int, Noticias>
     */
    public function getNoticias(): Collection
    {
        return $this->noticias;
    }

    public function addNoticia(Noticias $noticia): static
    {
        if (!$this->noticias->contains($noticia)) {
            $this->noticias->add($noticia);
            $noticia->setUsuario($this);
        }

        return $this;
    }

    public function removeNoticia(Noticias $noticia): static
    {
        if ($this->noticias->removeElement($noticia)) {
            // set the owning side to null (unless already changed)
            if ($noticia->getUsuario() === $this) {
                $noticia->setUsuario(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Productos>
     */
    public function getProductos(): Collection
    {
        return $this->productos;
    }

    public function addProducto(Productos $producto): static
    {
        if (!$this->productos->contains($producto)) {
            $this->productos->add($producto);
            $producto->setUsuarioProducto($this);
        }

        return $this;
    }

    public function removeProducto(Productos $producto): static
    {
        if ($this->productos->removeElement($producto)) {
            // set the owning side to null (unless already changed)
            if ($producto->getUsuarioProducto() === $this) {
                $producto->setUsuarioProducto(null);
            }
        }

        return $this;
    }
}
