class CreateArticle_1545213610645 {
  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" text NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "article"`);
  }
}

module.exports = {
  CreateArticle_1545213610645,
};
