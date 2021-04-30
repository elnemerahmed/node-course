const validator = require( 'validator' );
const chalk = require('chalk');
const yargs = require( 'yargs' );

const note = require( './notes' );

yargs.version( '1.1.0' );

yargs.command(
    {
        command: 'add',
        description: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'Note body',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            note.addNote( argv.title, argv.body );
        }
    }
);

yargs.command(
    {
        command: 'remove',
        description: 'Remove a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            note.removeNote( argv.title );
        }
    }
);

yargs.command(
    {
        command: 'list',
        description: 'List Notes',
        handler(argv) {
            note.listNotes();
        }
    }
);

yargs.command(
    {
        command: 'read',
        description: 'Read Note',
        builder: {
            title: {
                describe: 'Note Title',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            note.readNote(argv.title);
        }
    }
);

yargs.parse();