web3.extend({
    property: 'fsn',
    methods: [{
            name: 'getBalance',
            call: 'fsn_getBalance',
            params: 3,
            inputFormatter: [
                null,
                web3.extend.formatters.inputAddressFormatter,
                web3.extend.formatters.inputDefaultBlockNumberFormatter
            ]
        },
        {
            name: 'getAllBalances',
            call: 'fsn_getAllBalances',
            params: 2,
            inputFormatter: [
                web3.extend.formatters.inputAddressFormatter,
                web3.extend.formatters.inputDefaultBlockNumberFormatter
            ]
        },
        {
            name: 'getTimeLockBalance',
            call: 'fsn_getTimeLockBalance',
            params: 3,
            inputFormatter: [
                null,
                web3.extend.formatters.inputAddressFormatter,
                web3.extend.formatters.inputDefaultBlockNumberFormatter
            ]
        },
        {
            name: 'getAllTimeLockBalances',
            call: 'fsn_getAllTimeLockBalances',
            params: 2,
            inputFormatter: [
                web3.extend.formatters.inputAddressFormatter,
                web3.extend.formatters.inputDefaultBlockNumberFormatter
            ]
        },
        {
            name: 'getNotation',
            call: 'fsn_getNotation',
            params: 2,
            inputFormatter: [
                web3.extend.formatters.inputAddressFormatter,
                web3.extend.formatters.inputDefaultBlockNumberFormatter
            ]
        },
        {
            name: 'getAddressByNotation',
            call: 'fsn_getAddressByNotation',
            params: 2,
            inputFormatter: [
                null,
                web3.extend.formatters.inputDefaultBlockNumberFormatter
            ]
        },
        {
            name: 'allNotation',
            call: 'fsn_allNotation',
            params: 1,
            inputFormatter: [
                web3.extend.formatters.inputDefaultBlockNumberFormatter
            ]
        },
        {
            name: 'genNotation',
            call: 'fsn_genNotation',
            params: 2,
            inputFormatter: [
                web3.extend.formatters.inputTransactionFormatter,
                null
            ]
        },
        {
            name: 'genAsset',
            call: 'fsn_genAsset',
            params: 2,
            inputFormatter: [
                function (options) {
                    if (options.name === undefined || !options.name) {
                        throw new Error('invalid name');
                    }
                    if (options.symbol === undefined || !options.symbol) {
                        throw new Error('invalid symbol');
                    }
                    if (options.decimals === undefined || options.decimals <= 0 || options.decimals > 255) {
                        throw new Error('invalid decimals');
                    }
                    if (options.total !== undefined) {
                        options.total = web3.fromDecimal(options.total)
                    }
                    return web3.extend.formatters.inputTransactionFormatter(options)
                },
                null
            ]
        },
        {
            name: 'allAssets',
            call: 'fsn_allAssets',
            params: 1,
            inputFormatter: [
                web3.extend.formatters.inputDefaultBlockNumberFormatter
            ]
        },
        {
            name: 'sendAsset',
            call: 'fsn_sendAsset',
            params: 2,
            inputFormatter: [
                web3.extend.formatters.inputTransactionFormatter,
                null
            ]
        },
        {
            name: 'assetToTimeLock',
            call: 'fsn_assetToTimeLock',
            params: 2,
            inputFormatter: [
                function (options) {
                    return web3.extend.formatters.inputTransactionFormatter(options)
                },
                null
            ]
        },
        {
            name: 'timeLockToTimeLock',
            call: 'fsn_timeLockToTimeLock',
            params: 2,
            inputFormatter: [
                function (options) {
                    return web3.extend.formatters.inputTransactionFormatter(options)
                },
                null
            ]
        },
        {
            name: 'timeLockToAsset',
            call: 'fsn_timeLockToAsset',
            params: 2,
            inputFormatter: [
                function (options) {
                    return web3.extend.formatters.inputTransactionFormatter(options)
                },
                null
            ]
        },
        {
            name: 'allTickets',
            call: 'fsn_allTickets',
            params: 1,
            inputFormatter: [
                web3.extend.formatters.inputDefaultBlockNumberFormatter
            ]
        },
        {
            name: 'buyTicket',
            call: 'fsn_buyTicket',
            params: 2,
            inputFormatter: [
                web3.extend.formatters.inputTransactionFormatter,
                null
            ]
        }
    ]
});