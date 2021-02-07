import './App.css';
import React, { Component } from 'react';
import RecieptView from './ViewModels/Reciept';

const __RECEIPT_TOTAL_MAX__ = 1000;
const __MAX_NUM_OF_RECEIPTS__ = 5;
class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			receipts: [{}],
			rates: {},
		};

		this.intervalFunc = () => {
			fetch('https://api.exchangeratesapi.io/latest?base=CAD')
				.then(response => response.json())
				.then(data => this.setState({ rates: data.rates }));
		};
	}

	componentDidMount() {
		setInterval(this.intervalFunc.bind(this), 1000);
	}

	render() {
		const { receipts } = this.state;
		const total = this.getTotal().toFixed(2)
		return (
			<div className="container">
				<div className="content">
					{receipts.map((receipt, index) => (
						<RecieptView receipt={receipt} onUpdate={(data) => {
							const receiptsClone = [...receipts];
							receiptsClone[index] = data;
							this.setState({ receipts : receiptsClone });
						}}/>
					))}
				</div>
				<footer className="footer">
					<div className="footer-padding" />
					<div className="footer-content">
						<b>Total:</b>{total} CAD
						<button onClick={this.addNewReceipt.bind(this)}>
							Add New Receipt
						</button>
						<button onClick={() => console.log(this.state.receipts)} disabled={!this.isValidSubmission(total)}>
							{!this.isValidSubmission(total) ? 'Amount may not exceed 1000 CAD' : 'Submit'}
						</button>
          			</div>
					<div className="footer-padding" />
				</footer>
			</div>
		);
	}

	
	componentWillUnmount() {
		clearInterval(this.intervalFunc);
	}

	getConvertedValue(amount, quote) {
		const { rates } = this.state;
		const quoteAmount = Number(rates[quote] || 1);
		return amount / quoteAmount; 
	}

	getTotal() {
		const { receipts } = this.state;
		let total = 0;
		Object.values(receipts).forEach(receipt => {
			total += this.getConvertedValue(receipt.amount, receipt.currency);
		});
		return total;
	}

	addNewReceipt() {
		if(this.canAddNewReceipt()) {
			const { receipts } = this.state;
			receipts.push({});
			this.setState({ receipts });
		}
	}

	canAddNewReceipt() {
		return Object.values(this.state.receipts).length < __MAX_NUM_OF_RECEIPTS__;
	}

	isValidSubmission(value) {
		return value <= __RECEIPT_TOTAL_MAX__;
	}
}

export default App;
