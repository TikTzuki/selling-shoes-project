// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.api;

import com.lazada.lazop.util.ApiException;

public interface ILazopClient
{
    LazopResponse execute(final LazopRequest p0) throws ApiException;
    
    LazopResponse execute(final LazopRequest p0, final String p1) throws ApiException;
}
