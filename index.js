const fs = require('fs');
const { Client, Collection, Intents, InteractionCollector } = require('discord.js');
const { token,API_URL } = require('./config.json');
const { MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { config } = require('dotenv');
const store = []
const newData = []

config();



var flag = false
// get data from api
client.once('ready', () => {
	console.log('Bot is ready!');
});

// const update = async () => {
// try {
// 	const response = await axios.get('process.env.API_URL');

// 	store.push({ data: response.data })
// 	newData.push(store[0].data)

// 	} catch (error) {
// 		console.error(error);
// 	}

// }


client.commands = new Collection();



axios.get(API_URL).then((response) => {
	
	store.push({ data: response.data })
	newData.push(store[0].data)
	
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;
		if (interaction.commandName === 'getnotes') {
			const data = new SlashCommandBuilder()
				.setName('getnotes')

		}
	});

	client.on('interactionCreate', async interaction => {
		flag = false
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'notes') {
			
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('bce')
						.setLabel('BCE')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('bme')
						.setLabel('BME')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('ls')
						.setLabel('LS')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('em')
						.setLabel('EM')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('others')
						.setLabel('Others')
						.setStyle('PRIMARY'),
				);

			await interaction.reply({
				content: 'Select Subject!', components: [row]
			});
		}
	});
	client.on('interactionCreate', async interaction => {

		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'getnotes') {
			const string = interaction.options.getString('input');
			
			newData[0].forEach(element => {
				if (element.uuid == string) {
					interaction.reply(element.link).catch(err => { });
					flag = true
				} 
				
			});
			if (!flag) {
				interaction.reply("No notes available").catch(err => { });
			}
		}
	});
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;
		if (interaction.commandName === 'help') {
			const exampleEmbed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Help Menu')
				.setDescription('Use commands like below')
				.addFields(
					{ name: 'Get all notes of specific subjects', value: '/notes' },
					{ name: 'Get Notes of specific topic', value: '/getnotes/<Topic Code>', },
				)
				.setTimestamp()

			interaction.reply({ embeds: [exampleEmbed] });
		}
	});

	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand) return;
		if (!interaction.isButton) return;


		if (interaction.customId === 'bce') {

			newData[0].forEach(element => {
				if (element.sub == 'BCE') {

					interaction.reply("Use the command /getnotes/<Topic Code> to get notes of specific topic!").catch(err => { });
					const exampleEmbed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle(`Topic: ${element.name} (Topic Code: ${element.uuid}) `)
						.setDescription(`Use the command /getnotes/${element.uuid} to get notes of this topic!`)
						.addFields(
							{ name: `Topic: ${element.name} | Date:${element.date} | Topic Code: ${element.uuid}`, value: ` Topic Code: ${element.uuid}` },
						)
						.setTimestamp()
					interaction.channel.send({ embeds: [exampleEmbed] }).catch(err => { });
					flag = true
				}


			});
			if (!flag) {
				interaction.reply("No notes available").catch(err => { });
			}



		}
		if (interaction.customId === 'bme') {
			
			newData[0].forEach(element => {
				if (element.sub == 'BME') {
					interaction.reply("Use the command /getnotes/<Topic Code> to get notes of specific topic!").catch(err => { });
					const exampleEmbed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle(`Topic: ${element.name} (Topic Code: ${element.uuid}) `)
						.setDescription(`Use the command /getnotes/${element.uuid} to get notes of this topic!`)
						.addFields(
							{ name: `Topic: ${element.name} | Date:${element.date} | Topic Code: ${element.uuid}`, value: ` Topic Code: ${element.uuid}` },
						)
						.setTimestamp()
					interaction.channel.send({ embeds: [exampleEmbed] }).catch(err => { });
				} else {
					interaction.reply("No notes available").catch(err => { });
					flag = 1
				}


			});
			if (!flag) {
				interaction.reply("No notes available").catch(err => { });
			}



		}
		if (interaction.customId === 'ls') {
			
			newData[0].forEach(element => {
				if (element.sub == 'LS') {
					interaction.reply("Use the command /getnotes/<Topic Code> to get notes of specific topic!").catch(err => { });
					const exampleEmbed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle(`Topic: ${element.name} (Topic Code: ${element.uuid}) `)
						.setDescription(`Use the command /getnotes/${element.uuid} to get notes of this topic!`)
						.addFields(
							{ name: `Topic: ${element.name} | Date:${element.date} | Topic Code: ${element.uuid}`, value: ` Topic Code: ${element.uuid}` },
						)
						.setTimestamp()
					interaction.channel.send({ embeds: [exampleEmbed] }).catch(err => { });
					flag = 1
				}


			});
			if (!flag) {
				interaction.reply("No notes available").catch(err => { });
			}



		}
		if (interaction.customId === 'em') {
			
			newData[0].forEach(element => {
				if (element.sub == 'EM') {
					interaction.reply("Use the command /getnotes/<Topic Code> to get notes of specific topic!").catch(err => { });
					const exampleEmbed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle(`Topic: ${element.name} (Topic Code: ${element.uuid}) `)
						.setDescription(`Use the command /getnotes/${element.uuid} to get notes of this topic!`)
						.addFields(
							{ name: `Topic: ${element.name} | Date:${element.date} | Topic Code: ${element.uuid}`, value: ` Topic Code: ${element.uuid}` },
						)
						.setTimestamp()
					interaction.channel.send({ embeds: [exampleEmbed] }).catch(err => { });
					flag = 1
				}


			});
			if (!flag) {
				interaction.reply("No notes available").catch(err => { });
			}



		}
		if (interaction.customId === 'pss') {
			
			newData[0].forEach(element => {
				if (element.sub == 'PSS') {
					interaction.reply("Use the command /getnotes/<Topic Code> to get notes of specific topic!").catch(err => { });
					const exampleEmbed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle(`Topic: ${element.name} (Topic Code: ${element.uuid}) `)
						.setDescription(`Use the command /getnotes/${element.uuid} to get notes of this topic!`)
						.addFields(
							{ name: `Topic: ${element.name} | Date:${element.date} | Topic Code: ${element.uuid}`, value: ` Topic Code: ${element.uuid}` },
						)
						.setTimestamp()
					interaction.channel.send({ embeds: [exampleEmbed] }).catch(err => { });
					flag = 1
				}


			});
			if (!flag) {
				interaction.reply("No notes available").catch(err => { });
			}



		}
		if (interaction.customId === 'lca') {
			
			newData[0].forEach(element => {
				if (element.sub == 'LSA') {
					interaction.reply("Use the command /getnotes/<Topic Code> to get notes of specific topic!").catch(err => { });
					const exampleEmbed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle(`Topic: ${element.name} (Topic Code: ${element.uuid}) `)
						.setDescription(`Use the command /getnotes/${element.uuid} to get notes of this topic!`)
						.addFields(
							{ name: `Topic: ${element.name} | Date:${element.date} | Topic Code: ${element.uuid}`, value: ` Topic Code: ${element.uuid}` },
						)
						.setTimestamp()
					interaction.channel.send({ embeds: [exampleEmbed] }).catch(err => { });
					flag = 1
				}


			});
			if (!flag) {
				interaction.reply("No notes available").catch(err => { });
			}



		}
		if (interaction.customId === 'others') {
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('lca')
						.setLabel('LC and A')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('pss')
						.setLabel('PSS')
						.setStyle('PRIMARY'),


				);

			await interaction.reply({
				content: 'Select Subject!', components: [row]
			});
		}

	})


	client.login(token);


})




