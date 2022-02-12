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



axios.post(process.env.API_URL + '/login	', {


	email: process.env.USER_NAME,
	password: process.env.PASS


  }).then(function(response) {
	  
	axios.get(process.env.API_URL + '/data', {
	  headers: {
		'x-access-token': response.data.token
	  }
	}).then((response) => {

	store.push({ data: response.data })
	newData.push(store[0].data)

	
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return
		if (interaction.commandName == 'notes') {
			backFromFuncion = create.start('notes',interaction)
			await interaction.reply({
				content: 'Select Subject!', components: [backFromFuncion]
			});
		} 	
		
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
		if (interaction.commandName == 'impquestion') {
			backFromFuncion = create.start('impquestion',interaction)
			await interaction.reply({
				content: 'Select Subject!', components: [backFromFuncion]
			});
		}
		
	});
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return
		if (interaction.commandName == 'youtubechannels') {
			backFromFuncion = create.start('youtubechannels',interaction)
			await interaction.reply({
				content: 'Select Subject!', components: [backFromFuncion]
			});
		}
		
	});
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return
		if (interaction.commandName == 'questionp') {
			backFromFuncion = create.start('questionp',interaction)
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
					{ name: 'Get notes', value: '/notes' },
					{ name: 'Get short capsule notes', value: '/capsule' },
					{ name: 'Get question paper', value: '/questionp' },
					{ name: 'Get important questions', value: '/impquestion', },
					{ name: 'Get youtube channels', value: '/youtubechannels' },
					{ name: 'Get series test question paper of MODEL ENGINEERING COLLEGE THRIKKKARA', value: '/seriesqp' },
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
	subjects=['pss','ls','lca','bme','bce','chem','em']
	subjectcode=['PSS','LS','LSA','BME','BCE','CHEM','EM']
	// send data start
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand) return;
		if (!interaction.isButton) return;
		// loop through subjects
		for (let i = 0; i < subjects.length; i++) {
			if (interaction.customId === 'notes'+subjects[i]) {
				create.getdata(subjectcode[i],'note',newData,interaction)
			}
			if (interaction.customId === 'capsule'+subjects[i]) {
				create.getdata(subjectcode[i],'capsule',newData,interaction)
			}
			if (interaction.customId === 'questionp'+subjects[i]) {
				create.getdata(subjectcode[i],'questionp',newData,interaction)
			}
			if (interaction.customId === 'impquestion'+subjects[i]) {
				create.getdata(subjectcode[i],'impquestion',newData,interaction)
			}
			if (interaction.customId === 'youtubechannels'+subjects[i]) {
				create.getdata(subjectcode[i],'youtubechannels',newData,interaction)
			}
			if (interaction.customId === 'seriesqp'+subjects[i]) {
				create.getdata(subjectcode[i],'seriesqp',newData,interaction)
			}
		}
	
// send data stop








// OTHER BUTTON CONFIGRATION FOR EACH COMMANDS

	typearray=['capsule','notes','questionp','impquestion','youtubechannels','seriesqp']
	// loop through typearray
	for (let i = 0; i < typearray.length; i++) {
		if (interaction.customId === typearray[i]+'others') {
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId(typearray[i]+'lca')
						.setLabel('LC and A')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId(typearray[i]+'pss')
						.setLabel('PSS')
						.setStyle('PRIMARY'),
					new MessageButton()
					.setCustomId(typearray[i]+'chem')
					.setLabel('CHEM')
					.setStyle('PRIMARY'),


				);

			await interaction.reply({
				content: 'Select Subject To Get Texts!', components: [row]
			});
		}
}
	
	

})


	client.login(token);


})




