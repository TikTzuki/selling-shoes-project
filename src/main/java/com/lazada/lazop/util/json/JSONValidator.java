// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util.json;

import java.text.StringCharacterIterator;
import java.text.CharacterIterator;

public class JSONValidator
{
    private JSONErrorListener listener;
    private CharacterIterator it;
    private char c;
    private int col;
    
    public JSONValidator(final JSONErrorListener listener) {
        this.listener = listener;
    }
    
    public boolean validate(String input) {
        input = input.trim();
        this.listener.start(input);
        final boolean ret = this.valid(input);
        this.listener.end();
        return ret;
    }
    
    private boolean valid(final String input) {
        if ("".equals(input)) {
            return true;
        }
        boolean ret = true;
        this.it = new StringCharacterIterator(input);
        this.c = this.it.first();
        this.col = 1;
        if (!this.value()) {
            ret = this.error("value", 1);
        }
        else {
            this.skipWhiteSpace();
            if (this.c != '\uffff') {
                ret = this.error("end", this.col);
            }
        }
        return ret;
    }
    
    private boolean value() {
        return this.literal("true") || this.literal("false") || this.literal("null") || this.string() || this.number() || this.object() || this.array();
    }
    
    private boolean literal(final String text) {
        final CharacterIterator ci = new StringCharacterIterator(text);
        char t = ci.first();
        if (this.c != t) {
            return false;
        }
        final int start = this.col;
        boolean ret = true;
        for (t = ci.next(); t != '\uffff'; t = ci.next()) {
            if (t != this.nextCharacter()) {
                ret = false;
                break;
            }
        }
        this.nextCharacter();
        if (!ret) {
            this.error("literal " + text, start);
        }
        return ret;
    }
    
    private boolean array() {
        return this.aggregate('[', ']', false);
    }
    
    private boolean object() {
        return this.aggregate('{', '}', true);
    }
    
    private boolean aggregate(final char entryCharacter, final char exitCharacter, final boolean prefix) {
        if (this.c != entryCharacter) {
            return false;
        }
        this.nextCharacter();
        this.skipWhiteSpace();
        if (this.c == exitCharacter) {
            this.nextCharacter();
            return true;
        }
        while (true) {
            if (prefix) {
                final int start = this.col;
                if (!this.string()) {
                    return this.error("string", start);
                }
                this.skipWhiteSpace();
                if (this.c != ':') {
                    return this.error("colon", this.col);
                }
                this.nextCharacter();
                this.skipWhiteSpace();
            }
            if (!this.value()) {
                return this.error("value", this.col);
            }
            this.skipWhiteSpace();
            if (this.c == ',') {
                this.nextCharacter();
                this.skipWhiteSpace();
            }
            else {
                if (this.c == exitCharacter) {
                    this.nextCharacter();
                    return true;
                }
                return this.error("comma or " + exitCharacter, this.col);
            }
        }
    }
    
    private boolean number() {
        if (!Character.isDigit(this.c) && this.c != '-') {
            return false;
        }
        final int start = this.col;
        if (this.c == '-') {
            this.nextCharacter();
        }
        if (this.c == '0') {
            this.nextCharacter();
        }
        else {
            if (!Character.isDigit(this.c)) {
                return this.error("number", start);
            }
            while (Character.isDigit(this.c)) {
                this.nextCharacter();
            }
        }
        if (this.c == '.') {
            this.nextCharacter();
            if (!Character.isDigit(this.c)) {
                return this.error("number", start);
            }
            while (Character.isDigit(this.c)) {
                this.nextCharacter();
            }
        }
        if (this.c == 'e' || this.c == 'E') {
            this.nextCharacter();
            if (this.c == '+' || this.c == '-') {
                this.nextCharacter();
            }
            if (!Character.isDigit(this.c)) {
                return this.error("number", start);
            }
            while (Character.isDigit(this.c)) {
                this.nextCharacter();
            }
        }
        return true;
    }
    
    private boolean string() {
        if (this.c != '\"') {
            return false;
        }
        final int start = this.col;
        boolean escaped = false;
        this.nextCharacter();
        while (this.c != '\uffff') {
            if (!escaped && this.c == '\\') {
                escaped = true;
            }
            else if (escaped) {
                if (!this.escape()) {
                    return false;
                }
                escaped = false;
            }
            else if (this.c == '\"') {
                this.nextCharacter();
                return true;
            }
            this.nextCharacter();
        }
        return this.error("quoted string", start);
    }
    
    private boolean escape() {
        final int start = this.col - 1;
        if ("\\\"/bfnrtu".indexOf(this.c) < 0) {
            return this.error("escape sequence \\\",\\\\,\\/,\\b,\\f,\\n,\\r,\\t or \\uxxxx", start);
        }
        return this.c != 'u' || (this.ishex(this.nextCharacter()) && this.ishex(this.nextCharacter()) && this.ishex(this.nextCharacter()) && this.ishex(this.nextCharacter())) || this.error("unicode escape sequence \\uxxxx", start);
    }
    
    private boolean ishex(final char d) {
        return "0123456789abcdefABCDEF".indexOf(this.c) >= 0;
    }
    
    private char nextCharacter() {
        this.c = this.it.next();
        ++this.col;
        return this.c;
    }
    
    private void skipWhiteSpace() {
        while (Character.isWhitespace(this.c)) {
            this.nextCharacter();
        }
    }
    
    private boolean error(final String type, final int col) {
        if (this.listener != null) {
            this.listener.error(type, col);
        }
        return false;
    }
}
