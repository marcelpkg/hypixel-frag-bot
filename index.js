require("dotenv").config();
const mineflayer = require("mineflayer");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fetch = require("node-fetch");

client.on("ready", () => {
  console.log(
    `${client.user.username} is online in ${client.guilds.cache.size} guilds!`
  );
  client.user.setActivity(`floor 7 in Hypixel Skyblock Dungeons!`, {
    type: "PLAYING",
  });
});

// Creating the Minecraft Bot

const bot = mineflayer.createBot({
  host: "mc.hypixel.net",
  port: 25565,
  username: process.env.MINECRAFTEMAIL,
  password: process.env.MINECRAFTPASSWORD,
});

bot.on("login", (async) => {
  console.log("We have takeoff! Minecraft bot is launched!");
  bot.chat(`/party leave`);
  bot.chat(`/l`);
});

// Main Structure
client.on(`message`, async (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;

  const args = message.content.slice(process.env.PREFIX).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Commands

  if (command === "help") {
    message.channel.send(
      "f!frag f!info and f!support and f!help (unless prefix is changed)"
    );
  }

  if (command === "frag") {
    if (!args[0])
      return message.channel.send("Please specify a username first!");

    bot.chat(`/party accept ${args[0]}`);

    message.channel.send(
      `Succesfully ran the accept command, if the bot did not join, it means someone else is currently using the bot. Please wait up to 1-10 seconds if this occurs, ${message.author}.`
    );

    setTimeout(leaveParty, 10000);
    setTimeout(goLobby, 10500);

    function leaveParty() {
      bot.chat(`/party leave`);
    }
    function goLobby() {
      bot.chat(`/l`);
    }
  }

  if (command === "info") {
    message.channel.send("bot made by bmarcel!");
  }

  if (command === "support") {
    message.channel.send("dm bmarcel for support!");
  }
});

try {
  client.login(process.env.TOKEN);
} catch (error) {
  console.log(`Error: ${error}`);
}
