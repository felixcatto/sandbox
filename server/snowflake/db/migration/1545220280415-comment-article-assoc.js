class CommentArticleAssoc_1545220280415 {
  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "comment" ADD "articleId" integer`);
    await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c20404221e5c125a581a0d90c0e" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c20404221e5c125a581a0d90c0e"`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "articleId"`);
  }
}

module.exports = {
  CommentArticleAssoc_1545220280415,
};
