<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs  !
 */
final class Version20250221194653 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE noticias CHANGE foto foto LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE productos CHANGE foto foto LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE usuarios CHANGE gmail email VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE usuarios CHANGE email gmail VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE noticias CHANGE foto foto LONGTEXT NOT NULL');
        $this->addSql('ALTER TABLE productos CHANGE foto foto LONGBLOB DEFAULT NULL');
    }
}
