const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');


const commands = [
	new SlashCommandBuilder().setName('notes').setDescription('Get all Notes of Subject'),
	new SlashCommandBuilder().setName('help').setDescription('Get all Commands'),
	new SlashCommandBuilder().setName('getnotes').setDescription('Get Specific Notes').addStringOption(option => option.setName('input').setDescription('Enter Topic Code').setRequired(true)),

]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);