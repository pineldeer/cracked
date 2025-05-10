package com.example.cracked_android.network

import com.example.cracked_android.network.dto.UserInfo
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface MyRestAPI {
    @POST("/api/users/register/{user_id}")
    suspend fun PostRegisterUser(
        @Path("user_id") userId:String,
        @Query("name") name: String,
        @Query("gender") gender: String,
        @Query("age") age: Int,
    )

    @GET("/api/users/user_info/{user_id}")
    suspend fun GetUserInfo(
        @Path("user_id") userId:String,

    ): UserInfo

}