package com.example.cracked_android.viewModel

import android.net.Uri
import androidx.lifecycle.ViewModel
import com.example.cracked_android.data.PrefRepository
import com.example.cracked_android.network.MyRestAPI
import com.example.cracked_android.network.dto.UserInfo
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject

@HiltViewModel
class InfoViewModel @Inject constructor(
    private val api: MyRestAPI,
    private val prefRepository: PrefRepository,
) :ViewModel(){

    private val _imageUri:MutableStateFlow<Uri?> = MutableStateFlow(null)
    val imageUri: StateFlow<Uri?> = _imageUri.asStateFlow()

    fun setImageUri(value:Uri){
        _imageUri.value = value
    }

    private val _username = MutableStateFlow("")
    val username: StateFlow<String> = _username.asStateFlow()

    fun setUsername(value:String){
        _username.value = value
    }

    private val _genderIsMale:MutableStateFlow<Boolean?> = MutableStateFlow(null)
    val genderIsMale: StateFlow<Boolean?> = _genderIsMale.asStateFlow()

    fun setGender(isMale:Boolean){
        _genderIsMale.value = isMale
    }

    private val _age = MutableStateFlow(20)
    val age: StateFlow<Int> = _age.asStateFlow()

    fun setAge(value:Int){
        _age.value = value
    }




}