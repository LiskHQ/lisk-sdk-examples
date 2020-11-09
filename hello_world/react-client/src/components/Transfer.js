import React, { Component } from 'react';
import * as api from '../api.js';
import { transfer } from '../transactions/transfer';

class Transfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            address: '',
            amount: '',
            fee: '',
            passphrase: '',
            transaction: {},
        };
    }

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const res = await transfer({
            recipientAddress: this.state.address,
            amount: this.state.amount,
            fee: '0.1',
            passphrase: this.state.passphrase,
            networkIdentifier: 'f9aa0b17154aa27aa17f585b96b19a6559ed6ef3805352188312912c7b9192e5',
            minFeePerByte: 1000,
        });

        await api.sendTransactions(res.tx).then((response) => {
            this.setState({transaction:res.tx});
        });
    };

    render() {
        return (
            <div>
                <h2>Transfer</h2>
                <p>Send tokens from one account to another.</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Recipient:
                        <input type="text" id="address" name="address" onChange={this.handleChange} />
                    </label>
                    <label>
                        Amount (1 = 10^8 tokens):
                        <input type="text" id="amount" name="amount" onChange={this.handleChange} />
                    </label>
                    <label>
                        Fee:
                        <input type="text" id="fee" name="fee" onChange={this.handleChange} />
                    </label>
                    <label>
                        Passphrase:
                        <input type="text" id="passphrase" name="passphrase" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {this.state.transaction &&
                <div>
                    <pre>Transaction: {JSON.stringify(this.state.transaction, null, 2)}</pre>
                </div>
                }
            </div>
        );
    }
}
export default Transfer;
