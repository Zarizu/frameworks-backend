import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Populando banco de dados...');

  // Limpa o banco respeitando as dependências
  await prisma.$transaction([
    prisma.battleContestant.deleteMany(),
    prisma.battle.deleteMany(),
    prisma.gladiator.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // ==========================
  // Usuários
  // ==========================

  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: 'vitor',
        email: 'vitor@email.com',
      },
    }),
    prisma.user.create({
      data: {
        username: 'joao',
        email: 'joao@email.com',
      },
    }),
    prisma.user.create({
      data: {
        username: 'maria',
        email: 'maria@email.com',
      },
    }),
    prisma.user.create({
      data: {
        username: 'pedro',
        email: 'pedro@email.com',
      },
    }),
    prisma.user.create({
      data: {
        username: 'ana',
        email: 'ana@email.com',
      },
    }),
    prisma.user.create({
      data: {
        username: 'lucas',
        email: 'lucas@email.com',
      },
    }),
    prisma.user.create({
      data: {
        username: 'julia',
        email: 'julia@email.com',
      },
    }),
    prisma.user.create({
      data: {
        username: 'rafael',
        email: 'rafael@email.com',
      },
    }),
    prisma.user.create({
      data: {
        username: 'beatriz',
        email: 'beatriz@email.com',
      },
    }),
    prisma.user.create({
      data: {
        username: 'carlos',
        email: 'carlos@email.com',
      },
    }),
  ]);

  // ==========================
  // Gladiadores
  // ==========================

  const gladiators = await Promise.all([
    prisma.gladiator.create({
      data: { name: 'Maximus', userId: users[0].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Spartacus', userId: users[1].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Leonidas', userId: users[2].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Achilles', userId: users[3].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Hector', userId: users[4].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Perseus', userId: users[5].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Ajax', userId: users[6].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Odysseus', userId: users[7].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Theseus', userId: users[8].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Hercules', userId: users[9].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Kratos', userId: users[0].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Ares', userId: users[1].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Apollo', userId: users[2].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Zeus', userId: users[3].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Poseidon', userId: users[4].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Hermes', userId: users[5].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Atlas', userId: users[6].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Orion', userId: users[7].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Draco', userId: users[8].id },
    }),
    prisma.gladiator.create({
      data: { name: 'Titan', userId: users[9].id },
    }),
  ]);

  // ==========================
  // Batalhas
  // ==========================

  const battles = await Promise.all([
    prisma.battle.create({
      data: {
        name: 'Arena Principal',
        totalSteps: 1500,
        fileId: 'arena-principal.json',
      },
    }),
    prisma.battle.create({
      data: {
        name: 'Coliseu',
        totalSteps: 1800,
        fileId: 'coliseu.json',
      },
    }),
    prisma.battle.create({
      data: {
        name: 'Templo Perdido',
        totalSteps: 2100,
        fileId: 'templo-perdido.json',
      },
    }),
    prisma.battle.create({
      data: {
        name: 'Arena de Fogo',
        totalSteps: 1600,
        fileId: 'arena-fogo.json',
      },
    }),
    prisma.battle.create({
      data: {
        name: 'Arena de Gelo',
        totalSteps: 1700,
        fileId: 'arena-gelo.json',
      },
    }),
    prisma.battle.create({
      data: {
        name: 'Arena Vazia',
        totalSteps: 1000,
        fileId: 'arena-vazia.json',
      },
    }),
  ]);

  // ==========================
  // Participantes
  // ==========================

  await prisma.battleContestant.createMany({
    data: [
      // Arena Principal (5 participantes - cheia)
      {
        battleId: battles[0].id,
        gladiatorId: gladiators[0].id,
      },
      {
        battleId: battles[0].id,
        gladiatorId: gladiators[1].id,
      },
      {
        battleId: battles[0].id,
        gladiatorId: gladiators[2].id,
      },
      {
        battleId: battles[0].id,
        gladiatorId: gladiators[3].id,
      },
      {
        battleId: battles[0].id,
        gladiatorId: gladiators[4].id,
      },

      // Coliseu (3 participantes)
      {
        battleId: battles[1].id,
        gladiatorId: gladiators[5].id,
      },
      {
        battleId: battles[1].id,
        gladiatorId: gladiators[6].id,
      },
      {
        battleId: battles[1].id,
        gladiatorId: gladiators[7].id,
      },

      // Templo Perdido (2 participantes)
      {
        battleId: battles[2].id,
        gladiatorId: gladiators[8].id,
      },
      {
        battleId: battles[2].id,
        gladiatorId: gladiators[9].id,
      },

      // Arena de Fogo (4 participantes)
      {
        battleId: battles[3].id,
        gladiatorId: gladiators[10].id,
      },
      {
        battleId: battles[3].id,
        gladiatorId: gladiators[11].id,
      },
      {
        battleId: battles[3].id,
        gladiatorId: gladiators[12].id,
      },
      {
        battleId: battles[3].id,
        gladiatorId: gladiators[13].id,
      },

      // Arena de Gelo (1 participante)
      {
        battleId: battles[4].id,
        gladiatorId: gladiators[14].id,
      },
    ],
  });

  console.log('====================================');
  console.log('✅ Seed executada com sucesso!');
  console.log(`👤 Usuários: ${users.length}`);
  console.log(`⚔️ Gladiadores: ${gladiators.length}`);
  console.log(`🏟️ Batalhas: ${battles.length}`);
  console.log('====================================');
}

main()
  .catch((error) => {
    console.error('❌ Erro ao executar a seed');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });