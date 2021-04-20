// Variables

const mineflayer = require("mineflayer")
const Discord = require("discord.js")
const client = new Discord.Client() 
const config = require("./config.json")
const fetch = require("node-fetch")

client.on("ready", () => {
    console.log(`${client.user.username} is online in ${client.guilds.cache.size} guilds!`)
    client.user.setActivity(`floor 7 in Hypixel Skyblock Dungeons!`, {
        type: "PLAYING"
    })
})

// Creating the Minecraft Bot

const mc = mineflayer.createBot({
    host: 'localhost',
    port: 25565,
    username: config["minecraft-username"],
    password: config["minecraft-password"]
})

// Main Structure
client.on(`message`, async message => {


    if(message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    // Commands

    if(command === "frag") {
        if(!args[0]) { return
            console.log(`${message.author.discriminator} didn't specify a username.`)
            const embed = new Discord.MessageEmbed()
            .setTitle("ERROR:")
            .setColor("RED")
            .addField("ERROR ID:", "1")
            .addField("ERROR DESCRIPTION:", "User failed to specify a username.")
            .addField("EXAMPLE COMMAND:", `${config.prefix}frag <USERNAME>`)
        } else {
            mc.chat(`/party accept ${args[0]}`)
        }
    }

    if(command === "info") {
        message.channel.send("bot made by ducky#2974")
    }

    if(command === "support") {
        message.channel.send("dm ducky#2974")
    }
})

client.login(config.token)