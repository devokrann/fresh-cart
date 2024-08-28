-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "ip" TEXT,
    "city" TEXT,
    "region" TEXT,
    "country" TEXT,
    "loc" TEXT,
    "org" TEXT,
    "timezone" TEXT,
    "os" TEXT,
    "device_info" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devices_device_info_key" ON "devices"("device_info");

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_device_info_fkey" FOREIGN KEY ("device_info") REFERENCES "sessions"("session_token") ON DELETE CASCADE ON UPDATE CASCADE;
