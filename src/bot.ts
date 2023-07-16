import { Client, Interaction } from "discord.js";
import { addCommands } from "./commands/commands";
import { getOptions } from "./options";
import { OptionMap } from "./OptionMap";
import { getStockPrice } from "./stocks";

export class Bot {
    private client: Client = new Client({intents:["GuildMessages"]});
    
    constructor(token: string){
        this.client.login(token);
        addCommands(this.client);
        this.client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;
        
            const { commandName,  } = interaction;
        
            if (commandName === 'stock') {
                const ticker: string = (interaction.options.get('ticker')?.value as string)!.replace('$', '');
                const value = getStockPrice(ticker);
                interaction.reply(`$${ticker} is currently trading for ${value}`)
            } else if (commandName === 'option') {
                const ticker = (interaction.options.get('ticker')?.value as string).replace('$', '')
                const strikes = (interaction.options.get('strikes')?.value as number) || 6;
                const optionChain = await getOptions(ticker);
                const calls = optionChain.callsToStringEmbed(strikes)
                const puts = optionChain.putsToStringEmbed(strikes)
                interaction.reply({embeds: [calls, puts]})
                
            }
        });
    }



}