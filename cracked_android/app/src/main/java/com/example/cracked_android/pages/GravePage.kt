package com.example.cracked_android.pages

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.example.cracked_android.R
import com.example.cracked_android.ui.theme.QuestionsPanel

@Composable
fun GravePage() {
    var showQuestions by remember { mutableStateOf(false) }
    var isCreating by remember { mutableStateOf(false) }
    val questions = remember { mutableStateListOf<Pair<String, String>>() }
    var newAnswer by remember { mutableStateOf("") }

    Box(modifier = Modifier.fillMaxSize()) {
        // Grave 이미지 (중앙 위치 + 애니메이션)
        Column(
            modifier = Modifier
                .align(if (showQuestions) Alignment.TopCenter else Alignment.Center),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            GraveImage(onClick = { /* 묘지 클릭 처리 필요 시 */ })
        }

        // 질문 패널
        AnimatedVisibility(
            visible = showQuestions,
            enter = slideInVertically { it / 2 },
            exit = slideOutVertically { it / 2 },
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .height(400.dp) // 전체의 절반
                .background(Color(0xFFF5F5F5))
        ) {
            QuestionsPanel(
                questions = questions,
                isCreating = isCreating,
                newAnswer = newAnswer,
                onAnswerChange = { newAnswer = it },
                onAddQuestion = {
                    if (newAnswer.isNotBlank()) {
                        questions.add("질문입니다" to newAnswer)
                        newAnswer = ""
                        isCreating = false
                    }
                },
                onCancel = { isCreating = false },
                onStartCreating = { isCreating = true },
                onClose = {
                    showQuestions = false
                    isCreating = false
                    newAnswer = ""
                }
            )
        }

        // 하단 "질문 얻기" 버튼
        if (!showQuestions) {
            Button(
                onClick = { showQuestions = true },
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(24.dp)
            ) {
                Text("질문 얻기")
            }
        }
    }
}




@Composable
fun GraveImage(onClick:()->Unit) {
    Image(
        painter = painterResource(id = R.drawable.grave), // 파일 이름은 소문자 + 언더스코어만 허용
        contentDescription = "로컬 이미지",
        modifier = Modifier.clickable { onClick() },
        contentScale = ContentScale.Crop
    )
}