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
const express = require('express');
const app = express();
app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.get('/', (req, res) => res.send('Hello World!'))

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
		flag = false
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'texts') {
			
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('tbce')
						.setLabel('BCE')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('tbme')
						.setLabel('BME')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('tls')
						.setLabel('LS')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('tem')
						.setLabel('EM')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('tothers')
						.setLabel('Others')
						.setStyle('PRIMARY'),
				);

			await interaction.reply({
				content: 'Select Subject To Get Text!', components: [row]
			});
		}
	});
	client.on('interactionCreate', async interaction => {

		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'timetable') {
			const choice = interaction.options.getString('input');
			console.log(choice);
			
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
					{ name: 'Get Text of specific Subjects', value: '/texts', },
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
		if (interaction.customId === 'tbce') {

			newData[0].forEach(element => {
				if (element.sub == 'BCE' && element.type=='text') {

					
	
					interaction.channel.send(element.link).catch(err => { });
					flag = true
				}


			});
			if (!flag) {
				interaction.reply("No texts available").catch(err => { });
			}



		}
		if (interaction.customId === 'tbme') {

			newData[0].forEach(element => {
				if (element.sub == 'BME' && element.type=='text') {

					
	
					interaction.channel.send(element.link).catch(err => { });
					flag = true
				}


			});
			if (!flag) {
				interaction.reply("No texts available").catch(err => { });
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
		if (interaction.customId === 'tls') {

			newData[0].forEach(element => {
				if (element.sub == 'LS' && element.type=='text') {

					
	
					interaction.channel.send(element.link).catch(err => { });
					flag = true
				}


			});
			if (!flag) {
				interaction.reply("No texts available").catch(err => { });
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
		if (interaction.customId === 'tem') {

			newData[0].forEach(element => {
				if (element.sub == 'EM' && element.type=='text') {

					
	
					interaction.channel.send(element.link).catch(err => { });
					flag = true
				}


			});
			if (!flag) {
				interaction.reply("No texts available").catch(err => { });
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
		if (interaction.customId === 'tpss') {

			newData[0].forEach(element => {
				if (element.sub == 'PSS' && element.type=='text') {

					
	
					interaction.channel.send(element.link).catch(err => { });
					flag = true
				}


			});
			if (!flag) {
				interaction.reply("No text available").catch(err => { });
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
		if (interaction.customId === 'tlca') {

			newData[0].forEach(element => {
				if (element.sub == 'LCA' && element.type=='text') {

					
	
					interaction.channel.send(element.link).catch(err => { });
					flag = true
				}


			});
			if (!flag) {
				interaction.reply("No texts available").catch(err => { });
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
		if (interaction.customId === 'tothers') {
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('tlca')
						.setLabel('LC and A')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('tpss')
						.setLabel('PSS')
						.setStyle('PRIMARY'),


				);

			await interaction.reply({
				content: 'Select Subject To Get Texts!', components: [row]
			});
		}

	})


	client.login(token);


})




