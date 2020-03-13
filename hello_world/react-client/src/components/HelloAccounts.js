import React, { Component } from 'react';
const { APIClient } = require('@liskhq/lisk-api-client');

const API_BASEURL = 'http://localhost:4000';

const api = new APIClient([API_BASEURL]);

class HelloAccounts extends Component {

    constructor(props) {
        super(props);

        this.state = { data: [] };
    }

    async componentDidMount() {
        let offset = 0;
        let accounts = [];
        let accountsArray = [];

        do {
            const retrievedAccounts = await api.accounts.get({ limit: 100, offset });
            accounts = retrievedAccounts.data;
            accountsArray.push(...accounts);

            if (accounts.length === 100) {
                offset += 100;
            }
        } while (accounts.length === 100);

        let assetAccounts = [];
        for (var i = 0; i < accountsArray.length; i++) {
            let accountAsset = accountsArray[i].asset;
            if (accountAsset && Object.keys(accountAsset).indexOf("hello") > -1){
                assetAccounts.push(accountsArray[i]);
            }
        }

        this.setState({ data: assetAccounts });
    }

    render() {
        return (
            <div>
                <h2>All Hello accounts</h2>
                <div>{JSON.stringify(this.state.data)}</div>
            </div>
        );
    }
}
export default HelloAccounts;
