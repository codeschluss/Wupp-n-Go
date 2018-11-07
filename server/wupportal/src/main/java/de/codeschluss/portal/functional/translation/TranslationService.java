package de.codeschluss.portal.functional.translation;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;

@Service
public class TranslationService extends DataService<TranslationEntity, TranslationRepository> {

	public TranslationService(TranslationRepository repo,
			TranslationResourceAssembler assembler) {
		super(repo, assembler);
	}

	@Override
	public TranslationEntity getDuplicate(TranslationEntity newEntity) {
		return null;
	}

	@Override
	public TranslationEntity update(String id, TranslationEntity updatedEntity) {
		// TODO Auto-generated method stub
		return null;
	}

}
