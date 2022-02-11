const fs = require('fs');
const { Client, Collection, Intents, InteractionCollector, Message } = require('discord.js');
const { token, API_URL } = require('./config.json');
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
// import js file
const create = require('./initiate');
// import module

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
		if (!interaction.isCommand()) return
		if (interaction.commandName == 'notes') {
			backFromFuncion = create.start('notes',interaction)
		}
		await interaction.reply({
			content: 'Select Subject!', components: [backFromFuncion]
		});
	});
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return
		if (interaction.commandName == 'capsule') {
			backFromFuncion = create.start('capsule',interaction)
			await interaction.reply({
				content: 'Select Subject!', components: [backFromFuncion]
			});
		}
		
	});
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return
		if (interaction.commandName == 'seriesqp') {
			backFromFuncion = create.start('seriesqp',interaction)
			await interaction.reply({
				content: 'Select Subject!', components: [backFromFuncion]
			});
		}
		
	});
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return
		if (interaction.commandName == 'imp') {
			backFromFuncion = create.start('imp',interaction)
			await interaction.reply({
				content: 'Select Subject!', components: [backFromFuncion]
			});
		}
		
	});
	




	//Code for timetable
	client.on('interactionCreate', async interaction => {

		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'timetable') {

			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('offline')
						.setLabel('Offline Timetable')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('online')
						.setLabel('Online Timetable')
						.setStyle('PRIMARY'),

				);

			await interaction.reply({
				content: 'Select Type To Get Time Table!', components: [row]
			});

		}
	});
// end code for timetable



	// Help start
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
					{ name: 'Get Timetable Of CSEA S1', value: '/timetable', },
					{ name: 'Clear all chats (Only For Moderators)', value: '/clearchat', }
				)
				.setTimestamp()

			interaction.reply({ embeds: [exampleEmbed] });
		}
	});
	// Help Stop

	// Clear chat start
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;
		if (interaction.commandName === 'clearchat') {
			// check roles
			if (interaction.member.roles.cache.some(r => r.name === 'Moderators')) {


				interaction.channel.messages.fetch({ limit: 100 }).then(messages => {
					messages.forEach(message => {
						message.delete().then(() => {
							interaction.reply("Chat Cleared").catch(err => { });

						}).catch(err => { });
					})
				}
				)
			}
			else{
				interaction.reply("Sorry! You are not a Moderator").catch(err => { });
			}

		}
	});
	// clear chat stop

	// send timetable start
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand) return;
		if (!interaction.isButton) return;
		if (interaction.customId === 'offline') {
			interaction.reply({
				files: [
					'oftimetable.jpeg'
				]
			})
		}
		if (interaction.customId === 'online') {
			interaction.reply({
				files: [
					'ontimetable.jpg'
				]
			})
		}

	})
	// send timetable stop

	// send data start
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand) return;
		if (!interaction.isButton) return;
	if (interaction.customId === 'notesbce') {
		create.getdata('BCE','note',newData,interaction)
	}
	if (interaction.customId === 'notesbme') {

		create.getdata('BME','note',newData,interaction)
	}
	
	if (interaction.customId === 'notesls') {

		create.getdata('LS','note',newData,interaction)

	}
		
	if (interaction.customId === 'notesem') {

		create.getdata('EM','note',newData,interaction)
	}
		
	if (interaction.customId === 'notespss') {

		create.getdata('PSS','note',newData,interaction)



	}
	
	if (interaction.customId === 'noteslca') {

		create.getdata('LS','note',newData,interaction)
	}

// send data stop








// OTHER BUTTON CONFIGRATION FOR EACH COMMANDS


	if (interaction.customId === 'notesothers') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('noteslca')
					.setLabel('LC and A')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('notespss')
					.setLabel('PSS')
					.setStyle('PRIMARY'),


			);

		await interaction.reply({
			content: 'Select Subject To Get Texts!', components: [row]
		});
	}
	if (interaction.customId === 'impothers') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('implca')
					.setLabel('LC and A')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('imppss')
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




