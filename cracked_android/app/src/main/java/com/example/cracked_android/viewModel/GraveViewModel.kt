package com.example.cracked_android.viewModel

import android.net.Uri
import androidx.compose.runtime.MutableState
import androidx.lifecycle.ViewModel
import com.example.cracked_android.data.PrefRepository
import com.example.cracked_android.network.MyRestAPI
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject


@HiltViewModel
class GraveViewModel @Inject constructor(
    private val api: MyRestAPI,
    private val prefRepository: PrefRepository,
) : ViewModel(){


    private val _newAnswer = MutableStateFlow("")
    val newAnswer: StateFlow<String> = _newAnswer.asStateFlow()

    fun setNewAnswer(value: String){
        _newAnswer.value = value
    }

    private val _questions:MutableStateFlow<List<Pair<String,String>>> = MutableStateFlow(emptyList())
    val questions: StateFlow<List<Pair<String,String>>> = _questions.asStateFlow()

    fun setQuestions(value: List<Pair<String,String>>){
        _questions.value = value
    }

    fun addQuestion(value:Pair<String,String>){
        val nl=_questions.value.toMutableList()
        nl.add(value)
        setQuestions(nl)
    }
}
