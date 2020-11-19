// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util.json;

import java.math.BigInteger;
import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.text.StringCharacterIterator;
import java.text.CharacterIterator;
import java.util.Map;

public abstract class JSONReader
{
    private static final Object OBJECT_END;
    private static final Object ARRAY_END;
    private static final Object COLON;
    private static final Object COMMA;
    public static final int FIRST = 0;
    public static final int CURRENT = 1;
    public static final int NEXT = 2;
    private static Map<Character, Character> escapes;
    private CharacterIterator it;
    private char c;
    private Object token;
    private StringBuffer buf;
    
    public JSONReader() {
        this.buf = new StringBuffer();
    }
    
    private char next() {
        return this.c = this.it.next();
    }
    
    private void skipWhiteSpace() {
        while (Character.isWhitespace(this.c)) {
            this.next();
        }
    }
    
    public Object read(final CharacterIterator ci, final int start) {
        this.it = ci;
        switch (start) {
            case 0: {
                this.c = this.it.first();
                break;
            }
            case 1: {
                this.c = this.it.current();
                break;
            }
            case 2: {
                this.c = this.it.next();
                break;
            }
        }
        return this.read();
    }
    
    public Object read(final CharacterIterator it) {
        return this.read(it, 2);
    }
    
    public Object read(final String string) {
        return this.read(new StringCharacterIterator(string), 0);
    }
    
    private Object read() {
        this.skipWhiteSpace();
        final char ch = this.c;
        this.next();
        switch (ch) {
            case '\"': {
                this.token = this.string();
                break;
            }
            case '[': {
                this.token = this.array();
                break;
            }
            case ']': {
                this.token = JSONReader.ARRAY_END;
                break;
            }
            case ',': {
                this.token = JSONReader.COMMA;
                break;
            }
            case '{': {
                this.token = this.object();
                break;
            }
            case '}': {
                this.token = JSONReader.OBJECT_END;
                break;
            }
            case ':': {
                this.token = JSONReader.COLON;
                break;
            }
            case 't': {
                this.next();
                this.next();
                this.next();
                this.token = Boolean.TRUE;
                break;
            }
            case 'f': {
                this.next();
                this.next();
                this.next();
                this.next();
                this.token = Boolean.FALSE;
                break;
            }
            case 'n': {
                this.next();
                this.next();
                this.next();
                this.token = null;
                break;
            }
            default: {
                this.c = this.it.previous();
                if (Character.isDigit(this.c) || this.c == '-') {
                    this.token = this.number();
                    break;
                }
                break;
            }
        }
        return this.token;
    }
    
    private Object object() {
        final Map<Object, Object> ret = new HashMap<Object, Object>();
        Object key = this.read();
        while (this.token != JSONReader.OBJECT_END) {
            this.read();
            if (this.token != JSONReader.OBJECT_END) {
                ret.put(key, this.read());
                if (this.read() != JSONReader.COMMA) {
                    continue;
                }
                key = this.read();
            }
        }
        return ret;
    }
    
    private Object array() {
        final List<Object> ret = new ArrayList<Object>();
        Object value = this.read();
        while (this.token != JSONReader.ARRAY_END) {
            ret.add(value);
            if (this.read() == JSONReader.COMMA) {
                value = this.read();
            }
        }
        return ret;
    }
    
    private Object number() {
        int length = 0;
        boolean isFloatingPoint = false;
        this.buf.setLength(0);
        if (this.c == '-') {
            this.add();
        }
        length += this.addDigits();
        if (this.c == '.') {
            this.add();
            length += this.addDigits();
            isFloatingPoint = true;
        }
        if (this.c == 'e' || this.c == 'E') {
            this.add();
            if (this.c == '+' || this.c == '-') {
                this.add();
            }
            this.addDigits();
            isFloatingPoint = true;
        }
        final String s = this.buf.toString();
        return isFloatingPoint ? ((length < 17) ? Double.valueOf(s) : new BigDecimal(s)) : ((length < 19) ? Long.valueOf(s) : new BigInteger(s));
    }
    
    private int addDigits() {
        int ret = 0;
        while (Character.isDigit(this.c)) {
            this.add();
            ++ret;
        }
        return ret;
    }
    
    private Object string() {
        this.buf.setLength(0);
        while (this.c != '\"') {
            if (this.c == '\\') {
                this.next();
                if (this.c == 'u') {
                    this.add(this.unicode());
                }
                else {
                    final Object value = JSONReader.escapes.get(this.c);
                    if (value == null) {
                        continue;
                    }
                    this.add((char)value);
                }
            }
            else {
                this.add();
            }
        }
        this.next();
        return this.buf.toString();
    }
    
    private void add(final char cc) {
        this.buf.append(cc);
        this.next();
    }
    
    private void add() {
        this.add(this.c);
    }
    
    private char unicode() {
        int value = 0;
        for (int i = 0; i < 4; ++i) {
            switch (this.next()) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9': {
                    value = (value << 4) + this.c - 48;
                    break;
                }
                case 'a':
                case 'b':
                case 'c':
                case 'd':
                case 'e':
                case 'f': {
                    value = (value << 4) + this.c - 107;
                    break;
                }
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F': {
                    value = (value << 4) + this.c - 75;
                    break;
                }
            }
        }
        return (char)value;
    }
    
    static {
        OBJECT_END = new Object();
        ARRAY_END = new Object();
        COLON = new Object();
        COMMA = new Object();
        (JSONReader.escapes = new HashMap<Character, Character>()).put('\"', '\"');
        JSONReader.escapes.put('\\', '\\');
        JSONReader.escapes.put('/', '/');
        JSONReader.escapes.put('b', '\b');
        JSONReader.escapes.put('f', '\f');
        JSONReader.escapes.put('n', '\n');
        JSONReader.escapes.put('r', '\r');
        JSONReader.escapes.put('t', '\t');
    }
}
