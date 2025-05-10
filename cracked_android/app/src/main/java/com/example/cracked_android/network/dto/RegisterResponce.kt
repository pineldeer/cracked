package com.example.cracked_android.network.dto

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)

data class RegisterResponse(
    @Json(name = "message")val message: String,
    @Json(name = "userId") val userId: String
)