const fs = require('fs');
const { Client, Collection, Intents, InteractionCollector, Message } = require('discord.js');
const { token, API_URL } = require('./config.json');
const { MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { config } = require('dotenv');
function start(commandName,interaction) {
    
		flag = false
		if (!interaction.isCommand()) return;
		console.log(commandName);
		

			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId(commandName+'bce')
						.setLabel('BCE')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId(commandName+'bme')
						.setLabel('BME')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId(commandName+'ls')
						.setLabel('LS')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId(commandName+'em')
						.setLabel('EM')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId(commandName+'others')
						.setLabel('Others')
						.setStyle('PRIMARY'),
				);
			return row
			
		
	
}




//note function
function getdata(subName,typeName,newData,interaction) {
	flag=false
	newData[0].forEach(element => {
		console.log(element)
		if (element.sub == subName && element.type==typeName) {
			console.log(element)
			interaction.reply(element.link).catch(err => { });
			flag = true
		}


	});
	if (!flag) {
		interaction.reply("No notes available").catch(err => { });
	}
}



// export
module.exports = {
	start,
	getdata
}