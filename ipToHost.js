#!/usr/bin/env node
var dns = require('dns');
var fs = require('fs');
var DEBUG = false;

/**
 * @author Jayson Grace <jayson.e.grace@gmail.com>
 */

/**
 * Determine if input is a file.
 * @param {string} input - File to test.
 */
function isFile(input) {
    if (fs.existsSync(input)) {
        if (DEBUG)
            console.log("File input");
        return true;
    }
    else return false;
}

/**
 * Validate an IP address. Not bulletproof, but it works pretty well.
 * @param {string} ipAddress - The ip address to validate.
 */
function validateIPaddress(ipAddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
        if (DEBUG)
            console.log("IP address input");
        return (true);
    }
    else {
        if (ipAddress != null)
            console.log('You have entered an invalid IP address!');
        return (false);
    }
}

/**
 * Get the hostname from an ip address.
 * @param {string} ip - The ip address to do a reverse lookup against.
 */
function reverseLookup(ip) {
    dns.reverse(ip, function (err, domains) {
        if (err != null) throw err;
        domains.forEach(function (domain) {
            dns.lookup(domain, function (err, ip) {
                console.log(ip, '[', domain, ']');
            });
        });
    });
}

/**
 * Ensure the input to the program is correct.
 * @param {string} input - Information input by the user.
 */
function validateInput(input) {
    if (isFile(input)) return true;
    else if (validateIPaddress(input)) return false;
    else
        throw 'No file or ip address specified!';
}

/**
 * Output the hostname from the file or single IP that was input.
 * @param {string} input - Information input by the user.
 * @param {boolean} fileInput - true if a file was input, false otherwise.
 */
function outputIPInfo(input, fileInput) {
    if (fileInput) {
        // Get array of ips from the input file
        ips = fs.readFileSync(input).toString().split('\n');
        // Remove empty items from array
        ips = ips.filter(Boolean);
        ips.forEach(function (ip) {
            reverseLookup(ip);
        });
    }
    else {
        reverseLookup(input);
    }
}

target = process.argv[2];
fileInput = validateInput(target);
outputIPInfo(target, fileInput);
