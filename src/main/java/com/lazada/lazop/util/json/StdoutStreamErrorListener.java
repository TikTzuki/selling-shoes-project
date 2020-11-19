// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util.json;

public class StdoutStreamErrorListener extends BufferErrorListener
{
    @Override
    public void end() {
        System.out.print(this.buffer.toString());
    }
}
