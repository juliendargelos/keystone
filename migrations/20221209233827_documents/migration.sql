-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "status" TEXT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "publishDate" DATETIME,
    "author" TEXT,
    CONSTRAINT "Post_author_fkey" FOREIGN KEY ("author") REFERENCES "Author" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("author", "content", "id", "publishDate", "status", "title") SELECT "author", "content", "id", "publishDate", "status", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE INDEX "Post_author_idx" ON "Post"("author");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
