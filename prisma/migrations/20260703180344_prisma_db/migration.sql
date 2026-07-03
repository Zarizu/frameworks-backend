-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gladiators" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gladiators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "total_steps" INTEGER NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "battles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battle_contestants" (
    "battle_id" INTEGER NOT NULL,
    "gladiator_id" INTEGER NOT NULL,

    CONSTRAINT "battle_contestants_pkey" PRIMARY KEY ("battle_id","gladiator_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "gladiators" ADD CONSTRAINT "gladiators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battle_contestants" ADD CONSTRAINT "battle_contestants_battle_id_fkey" FOREIGN KEY ("battle_id") REFERENCES "battles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battle_contestants" ADD CONSTRAINT "battle_contestants_gladiator_id_fkey" FOREIGN KEY ("gladiator_id") REFERENCES "gladiators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
