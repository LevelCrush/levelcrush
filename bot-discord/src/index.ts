import dotenv from 'dotenv';
import { ParseArgsConfig, parseArgs } from 'node:util';
import * as discord from './discord';
import { CategoryChannel, CategoryChildChannel, ChannelType, Events, User, channelLink } from 'discord.js';
import JoinToCreate, { JoinToCreateCleanup, JoinToCreateConfig } from './join_to_create';
import * as fs from 'fs';

// import env settings into the process env
dotenv.config();

function generate_invite_link() {
    const client_id = process.env['DISCORD_CLIENT_ID'] || '';
    return (
        'https://discord.com/api/oauth2/authorize?client_id=' +
        encodeURIComponent(client_id) +
        '&permissions=0&scope=bot%20applications.commands'
    );
}

async function bot() {
    const client = discord.create();
    const commands = await discord.slash_commands();

    const guild_jtcs = new Map<string, JoinToCreateCleanup>();

    client.on(Events.ClientReady, async () => {
        // reading join to create config
        console.log('Parsing JTC config');
        const jtc_config_file = await fs.promises.readFile(process.env['JOIN_TO_CREATE_CONFIG'] || '', {
            encoding: 'utf-8',
        });
        const jtc_json = JSON.parse(jtc_config_file) as JoinToCreateConfig;
        console.log(jtc_json);

        const jtc_manager = JoinToCreate();
        jtc_manager.configure(jtc_json);

        for (const [guild_id, guild] of client.guilds.cache) {
            console.log('Join to create enabled on ', guild.name);
            guild_jtcs.set(guild.id, jtc_manager.monitor(client, guild));
        }
    });

    // handle auto complete commands
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isAutocomplete()) {
            return;
        }

        const command = commands.get(interaction.commandName);
        if (!command || !command.autocomplete) {
            console.log('Command not accepted: ', interaction.commandName);
        } else {
            try {
                await command.autocomplete(interaction);
            } catch (err) {
                console.log('Auto complete failed! ', err);
            }
        }
    });

    // handle slash commands
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        const command = commands.get(interaction.commandName);
        if (!command) {
            console.log('Command not accepted: ', interaction.commandName);
        } else {
            try {
                await command.execute(interaction);
            } catch (err) {
                console.log('Command failed! ', err);

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'An internal error occurred during execution',
                        ephemeral: true,
                    });
                }

                await interaction.reply({
                    content: 'An internal error occurred during execution',
                    ephemeral: true,
                });
            }
        }
    });

    await discord.connect(client);
}

async function main() {
    const options = {
        invite: {
            type: 'boolean',
            short: 'i',
        },
    } as ParseArgsConfig['options'];

    const app_args = parseArgs({ options });
    if ((app_args.values as any)['invite']) {
        console.log('Generating an invite link. ');
        console.info(generate_invite_link());
    } else {
        await bot();
    }
}

main().catch((err) => console.log('An internal error occurred:', err));
