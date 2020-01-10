import React, { Component } from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import styled from 'styled-components'
import './App.css'

const Wrapper = styled.div`
	text-align: center;
`

const Heading = styled.h1`
	font-size: 3rem;
`

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => {
				this.setState({ robots: users })
			})
	}

	onSearchChange = event => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const { robots, searchfield } = this.state
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		return !robots.length ? (
			<h1>Loading</h1>
		) : (
			<Wrapper>
				<Heading>Cute Little Monsters</Heading>
				<SearchBox searchChange={this.onSearchChange} />
				<CardList robots={filteredRobots} />
			</Wrapper>
		)
	}
}

export default App
