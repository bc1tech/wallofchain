module.exports = {
    'parser': 'vue-eslint-parser',
    'parserOptions': {
        'parser': 'babel-eslint',
    },
    'extends': [
        'plugin:vue/recommended',
        'eslint-config-airbnb-base'
    ],
    'rules': {
        'vue/html-indent': [
            'error', 2, {
                'attribute': 2,
                'closeBracket': 0,
                'alignAttributesVertically': false,
                'ignores': []
            }
        ],
        'vue/max-attributes-per-line': [2, {
            'singleline': 1,
            'multiline': {
                'max': 1,
                'allowFirstLine': true
            }
        }],
        'vue/html-self-closing': ['error', {
            'html': {
                'void': 'never',
                'normal': 'never',
                'component': 'never'
            }
        }],
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never',
            'multiline': 'never'
        }]
    },
    'overrides': [{
        'files': ['*.vue'],
        'rules': {
            'indent': 'off',
            'vue/script-indent': ['error', 2, {
                'baseIndent': 1,
                'switchCase': 1,
            }],
        },
    }]
};
