package com.example.cracked_android.pages

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.tween
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
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.cracked_android.R
import com.example.cracked_android.ui.theme.QuestionsPanel
import com.example.cracked_android.viewModel.GraveViewModel

@Composable
fun GravePage() {
    val viewModel = hiltViewModel<GraveViewModel>()
    val screenHeight = LocalConfiguration.current.screenHeightDp.dp



    var showQuestions by remember { mutableStateOf(false) }
    var isCreating by remember { mutableStateOf(false) }
    //var newAnswer by remember { mutableStateOf("") }
    //val questions = remember { mutableStateListOf<Pair<String, String>>() }
    val newAnswer by viewModel.newAnswer.collectAsState()
    val questions by viewModel.questions.collectAsState()

    val graveOffsetY by animateDpAsState(
        targetValue = if (showQuestions) -screenHeight / 4 else 0.dp,
        animationSpec = tween(durationMillis = 300),
        label = "graveOffset"
    )

    val animatedOffsetY by animateDpAsState(
        targetValue = graveOffsetY,
        animationSpec = tween(300),
        label = "graveOffset"
    )

    Box(modifier = Modifier.fillMaxSize()) {
        // 무덤 이미지 (중앙, 애니메이션 offset 적용)
        Box(
            modifier = Modifier
                .align(Alignment.Center)
                .offset(y = animatedOffsetY)
        ) {
            GraveImage(onClick = { /* 묘지 클릭 시 처리 */ })
        }

        // 질문 얻기 버튼
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

        // 질문 창 패널
        AnimatedVisibility(
            visible = showQuestions,
            enter = slideInVertically(initialOffsetY = { it }),
            exit = slideOutVertically(targetOffsetY = { it }),
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .height(screenHeight / 2)
                .background(Color(0xFFF5F5F5))
        ) {
            QuestionsPanel(
                questions = questions,
                isCreating = isCreating,
                newAnswer = newAnswer,
                onAnswerChange = { viewModel.setNewAnswer(it) },
                onStartCreating = { isCreating = true },
                onCancelCreating = {
                    viewModel.setNewAnswer("")
                    isCreating = false
                },
                onSubmitAnswer = {
                    if (newAnswer.isNotBlank()) {
                        viewModel.addQuestion("질문입니다" to newAnswer)
                        viewModel.setNewAnswer("")
                        isCreating = false
                    }
                },
                onClose = {
                    showQuestions = false
                    isCreating = false
                    viewModel.setNewAnswer("")
                }
            )
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