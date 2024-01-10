-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT
);

-- CreateTable
CREATE TABLE "entries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "transcription" TEXT NOT NULL,
    "audio_filename" TEXT,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "collection_id" TEXT NOT NULL,
    CONSTRAINT "entries_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
