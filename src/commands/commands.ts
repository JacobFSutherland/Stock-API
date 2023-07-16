import { ApplicationCommandOptionType, Client, SlashCommandBuilder } from "discord.js";

export function addCommands(bot: Client): void {
    const guilds = bot.guilds.cache.map(guild => guild.id);

    guilds.map(guildId => {
        const commandManager = bot.guilds.cache.get(guildId)?.commands; // Use inbuilt manager 
        commandManager?.set(data).catch(console.error); // attempts to add or update commands on guild
    });
    
}

const data = [
    new SlashCommandBuilder()
        .setName("options")
        .setDescription("Get option information on a stock")
        .addStringOption((option) => option.setName("ticker")
        .setRequired(true))
        .addIntegerOption((option) => option.setName("strikes")
        .setRequired(true))
        .toJSON(),

    new SlashCommandBuilder()
        .setName("stocks")
        .setDescription("Get price information on an stock")
        .addStringOption((option) => option.setName("ticker")
        .setRequired(true))
        .toJSON()
]
