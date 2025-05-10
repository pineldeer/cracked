package com.example.cracked_android.viewModel

import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class InfoViewModel @Inject constructor(
    private val api: MyRestAPI,
    private val prefRepository: PrefRepository,
) :ViewModel(){

}