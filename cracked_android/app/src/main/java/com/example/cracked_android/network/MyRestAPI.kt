package com.example.cracked_android.network

import com.example.cracked_android.network.dto.ChatContent
import com.example.cracked_android.network.dto.UserInfo
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface MyRestAPI {
    @POST("/api/users/register/{user_id}")
    suspend fun registerUser(
        @Path("user_id") userId:String,
        @Query("name") name: String,
        @Query("gender") gender: String,
        @Query("age") age: Int,
    )

    @GET("/api/users/user_info/{user_id}")
    suspend fun getUserInfo(
        @Path("user_id") userId:String,

    ): UserInfo

    suspend fun getImageURL(userID:String):String{
        return "https://67e3-119-196-234-23.ngrok-free.app/api/users/image/${userID}"
    }

    @POST("/api/grave/save_grave_content/{user_id}")
    suspend fun saveGraveContent(
        @Path("user_id") userId:String,
        @Body content:String,
    )

    @GET("/api/grave/get_grave_content/{user_id}")
    suspend fun getGraveContent(
        @Path("user_id") userId:String,
    ):String

    @GET("/api/chat/get_all_chat/{user_id}")
    suspend fun getAllChat(
        @Path("user_id") userId:String,
    ): ChatContent

    @POST("/api/chat/create_question/{user_id}")
    suspend fun createQuestion(
        @Path("user_id") userId:String,
    ): ChatContent

    @POST("/api/chat/answer_question/{user_id}")
    suspend fun answerQuestion(
        @Path("user_id") userId:String,
        @Query("order_idx") orderIdx:Int,
        @Query("answer") answer:String,
    )


}