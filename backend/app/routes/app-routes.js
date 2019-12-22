const express = require("express");

const lembreteRoutes = require("../routes/lembrete");

module.exports = (app) => {
    app.use('/lembretes', lembreteRoutes);
}