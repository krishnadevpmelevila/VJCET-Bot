const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');


const commands = [
  new SlashCommandBuilder().setName('notes').setDescription('Get all Notes of Subject'),
  new SlashCommandBuilder().setName('texts').setDescription('Get all Texts of Subject'),
  new SlashCommandBuilder().setName('imp').setDescription('Get important questions of Subject'),
  new SlashCommandBuilder().setName('help').setDescription('Get all Commands'),
  new SlashCommandBuilder().setName('clearchat').setDescription('Clear all chats on this channel'),
  new SlashCommandBuilder().setName('getnotes').setDescription('Get Specific Notes').addStringOption(option => option.setName('input').setDescription('Enter Topic Code').setRequired(true)),
  new SlashCommandBuilder().setName('timetable').setDescription('Get Timetable'),
  new SlashCommandBuilder().setName('capsule').setDescription('Get Capsules'),
  new SlashCommandBuilder().setName('seriesqp').setDescription('Get series model question paper')


]
  .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);