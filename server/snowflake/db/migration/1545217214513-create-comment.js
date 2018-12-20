class CreateComment_1545217214513 {
  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "author" character varying NOT NULL, "text" text NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}

module.exports = {
  CreateComment_1545217214513,
};
