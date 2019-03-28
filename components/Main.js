import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, ListItem, Header, Overlay, Input, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Main extends React.Component {

	constructor(props){
		super(props);
		this.state = {
		  isVisible: false,
		  closeLoading: false,
		  addLoading: false,
	      noteArray: [],
	      noteText: ''
		}
	}

	render() {
	    return (
			<View>
				<Header>
					<Text></Text>
					<Text h1>My Notes</Text>
					<Button
					  icon={{
					    name: "plus",
					    size: 20,
					    color: "white",
					    type: "font-awesome"
					  }}
					  onPress={this.showAddModal.bind(this)}
					/>
				</Header>

				<ScrollView>
					<View>
					  {
					    this.state.noteArray.map((l, i) => (
					      <ListItem
					        key={i}
					        title={l.name}
					        subtitle={l.date}
        					rightIcon={<Icon name='trash' type='font-awesome' color="red" onPress={()=> this.deleteNote(i)}  />}
					      />
					    ))
					  }
					</View>
				</ScrollView>

				<Overlay
					isVisible={this.state.isVisible}
					width="80%"
					height="auto"
				>
					<View>
						<Text style={{marginBottom: 10}}>
							Add new note
						</Text>
						<Divider style={{ backgroundColor: 'white', height: 4 }} />
						<Input 
							placeholder="Something you must not forget..."
				            onChangeText={(noteText) => this.setState({noteText})}
				            value={this.state.noteText}
				        />
						<Divider style={{ backgroundColor: 'white', height: 4 }} />
						<Button
							loading={this.state.addLoading}
							backgroundColor='#03A9F4'
							buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
							title='Add now' 
							onPress={this.addModal.bind(this)} 
						/>
						<Button
							loading={this.state.closeLoading}
							type="outline"
							backgroundColor='lightred'
							buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
							title='Close' 
							onPress={this.closeAddModal.bind(this)} 
						/>
					</View>
				</Overlay>
			</View>
	    );
	}

	showAddModal(){
      	this.setState({ isVisible: true });
      	this.setState({ closeLoading: false });
	}

	addModal(){
      	this.setState({ addLoading: true });
	    if(this.state.noteText){

	      var d = new Date();
	      this.state.noteArray.push({
			'date': d.getFullYear()+ "/" + (d.getMonth() + 1) + "/" + d.getDate(),
			'name': this.state.noteText
	      });

	      this.setState({ noteArray: this.state.noteArray });
	      this.setState({ noteText: '' });

	    }

  		this.setState({ addLoading: false });
      	this.setState({ isVisible: false });
	}

	closeAddModal(){
      	this.setState({ isVisible: false });
      	this.setState({ closeLoading: true });
	}

	deleteNote(key){
	    this.state.noteArray.splice(key, 1);
	    this.setState({noteArray: this.state.noteArray})
	}
}