const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/status', async (req, res) => {
  try {
    const updatedAt = new Date().toISOString();

    const databaseVersion = await prisma.$queryRaw`SELECT version();`.then(
      (result) => {
        const versionString = result[0].version;
        const matches = versionString.match(/\d+(\.\d+)?/);
        return matches ? parseInt(matches[0]) : null;
      }
    );

    const maxConnections = await prisma.$queryRaw`
        SELECT setting AS max_connections 
        FROM pg_settings 
        WHERE name = 'max_connections';
      `.then((result) => {
        return parseInt(result[0].max_connections);
    });

    const openedConnections = await prisma.$queryRaw`
        SELECT count(*)::int
        FROM pg_stat_activity
        WHERE datname = ${process.env.POSTGRES_DB};
      `.then((result) => {
        return parseInt(result[0].count);
    });


    res.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: databaseVersion,
          max_connections: maxConnections,
          opened_connections: openedConnections,
        },
      },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect
  }
})

module.exports = router;
