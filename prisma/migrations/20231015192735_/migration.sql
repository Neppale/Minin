-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortenedUrl" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_originalUrl_key" ON "Url"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortenedUrl_key" ON "Url"("shortenedUrl");
